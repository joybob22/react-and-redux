import React from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import { Redirect } from 'react-router-dom';
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  }

  // handleChange = event => {
  //   //copy state and change the title
  //   const course = { ...this.state.course, title: event.target.value };
  //   this.setState({ course: course });
  // }

  // handleSubmit = event => {
  //   event.preventDefault();
  //   this.props.actions.createCourse(this.state.course);
  //   // below is how you would need to write the code if you don't use the mapDispatchToProps function at the end of this file.
  //   // this.props.dispatch(courseActions.createCourse(this.state.course));
  // }

  componentDidMount() {
    if (this.props.courses.length === 0) {
      this.props.actions.loadCourses().catch(err => {
        alert("loading courses failed " + err);
      })
    }
    if (this.props.authors.length === 0) {
      this.props.actions.loadAuthors().catch(err => {
        alert("loading authors failed " + err);
      })
    }
  }

  //an example of using async and await instead of promises
  handleDeleteCourse = async course => {
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (err) {
      toast.error("Delete failed. " + err.message, { autoClose: false })
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ?
          <Spinner />
          :
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >Add Course</button>
            <CourseList onDeleteClick={this.handleDeleteCourse} courses={this.props.courses} />
          </>
        }
      </>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

//requests the state thats needed for this component
function mapStateToProps(state) {
  return {
    courses: state.authors.length === 0
      ? []
      : state.courses.map(course => {
        return {
          ...course,
          authorName: state.authors.find(a => a.id === course.authorId).name
        }
      }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  }
}

//This function will add the dispatch functions to props. It makes the code cleaner.
//Check out the mapDispatchToProps in ManageCoursesPage for the object notation.

function mapDispatchToProps(dispatch) {
  return {
    // The comment below is how to map the dispatch to props without the bindActionCreators function
    // createCourse: course => dispatch(courseActions.createCourse(course))

    //The nice thing about doing it this way is it will bind all actions for you rather than you having to type out all the actions individually here.
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
