import React, { Component } from 'react'

class TimerForm extends Component {
  constructor() {
    super()
    this.state = {
      errorTitle: null,
      errorProject: null
    }
    this.handleValidation = this.handleValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.handleValidation();
  }
  handleValidation() {
    this.setState({
      errorTitle: this.refs.title.value.length === 0 ? 'Cannot be empty' : null,
      errorProject: this.refs.project.value.length === 0 ? 'Cannot be empty' : null
    });
  }
  handleSubmit() {
    if (this.state.errorTitle || this.state.errorProject) {
      return;
    }
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.refs.title.value,
      project: this.refs.project.value,
    });
  }
  getErrorMessage(errorMsg) {
    if (errorMsg) {
      return (
        <div className="ui error message">
          <p>{errorMsg}</p>
        </div>
      );
    } else {
      return null;
    }
  }
  render() {
    const errTitleMessage = this.getErrorMessage(this.state.errorTitle);
    const errProjectMessage = this.getErrorMessage(this.state.errorProject);
    const submitText = this.props.id ? 'Update' : 'Create';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form error'>
            <div className='field'>
              <label>Title</label>
              {errTitleMessage}
              <input type='text' ref='title'
                defaultValue={this.props.title}
                onChange={this.handleValidation}
              />
            </div>
            <div className='field'>
              <label>Project</label>
              {errProjectMessage}
              <input type='text' ref='project'
                defaultValue={this.props.project}
                onChange={this.handleValidation}
              />
            </div>
            <div className='ui two bottom attached buttons'>
              <button
                  className='ui basic blue button'
                  onClick={this.handleSubmit}
              >
                {submitText}
              </button>
              <button
                className='ui basic red button'
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimerForm;
