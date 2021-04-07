import React from 'react';
import CourseForm from './CourseForm';
import renderer from 'react-test-renderer';
import { courses, authors } from '../../../tools/mockData';
import { italics } from '../../../tools/fileMock';

it("sets submit button label 'Saving...' when saving is true", () => {
    const tree = renderer.create(
        <CourseForm
            course={courses[0]}
            authors={authors}
            //jest.fn is just an empty function to be passed into props
            onSave={jest.fn()}
            onChange={jest.fn()}
            //for boolean props if you just pass in a prop it is assumed to be true
            saving
        />
    );

    expect(tree).toMatchSnapshot();
});

it("sets submit button label 'Saving' when saving is false", () => {
    const tree = renderer.create(
        <CourseForm
            course={courses[0]}
            authors={authors}
            //jest.fn is just an empty function to be passed into props
            onSave={jest.fn()}
            onChange={jest.fn()}
            //for boolean props if you just pass in a prop it is assumed to be true
            saving={false}
        />
    );

    expect(tree).toMatchSnapshot();
});