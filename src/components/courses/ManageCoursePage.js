import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import { saveCourse } from "../../api/courseApi";
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

//Could just say 'props' as the parameter for the function but this destructering
//allows us to take pieces of props that way we dont have to say props.someProperty
//all the time.
function ManageCoursePage({ courses, authors, loadAuthors, loadCourses, saveCourse, history, ...props }) {
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        if (courses.length === 0) {
            loadCourses().catch(err => {
                alert("loading courses failed " + err);
            })
        } else {
            setCourse({ ...props.course })
        }
        if (authors.length === 0) {
            loadAuthors().catch(err => {
                alert("loading authors failed " + err);
            })
        }

    }, [props.course]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }));
    }

    function formIsValid() {
        const { title, authorId, category } = course;
        const errors = {};

        if (!title) errors.title = "Title is required";
        if (!authorId) errors.author = "Author is required";
        if (!category) errors.category = "Category is required";

        setErrors(errors);
        //Form is valid if the errors object still has no properties
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveCourse(course).then(() => {
            toast.success("Course Saved");
            history.push("/courses");
        }).catch(err => {
            setSaving(false);
            setErrors({ onSave: err.message });
        })
    }

    return (
        authors.length === 0 || courses.length === 0 ? (<Spinner />) :
            <CourseForm course={course} errors={errors} authors={authors} onChange={handleChange} onSave={handleSave} saving={saving} />
    )
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    loadCourses: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
}

export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
}

//requests the state thats needed for this component
function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;
    return {
        course: course,
        courses: state.courses,
        authors: state.authors
    }
}

//This is an alternative way to declaring mapDispatchToProps.
//In coursesPage.js we use the function notation. In here we use the object notation.
const mapDispatchToProps = {
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors,
    saveCourse: courseActions.saveCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
