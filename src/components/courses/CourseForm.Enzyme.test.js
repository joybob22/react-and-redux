import React from 'react';
import CourseForm from './CourseForm';
import { shallow } from 'enzyme';

function renderCourseForm(args) {
    //This adds default props and below we use the spread operator to overide any default props through args
    const defaultProps = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => { },
        onChange: () => { }
    }

    const props = { ...defaultProps, ...args };
    return shallow(<CourseForm {...props} />)
}

it('renders form header', () => {
    const wrapper = renderCourseForm();
    // console.log(wrapper.debug());
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h2').text()).toEqual('Add Course');
});

it('labels save buttons as "Save" when not saving', () => {
    const wrapper = renderCourseForm();
    expect(wrapper.find('button').text()).toBe("Save");
});

it('labels save buttons as "Save" when not saving', () => {
    const wrapper = renderCourseForm({ saving: true });
    expect(wrapper.find('button').text()).toBe("Saving...");
});
