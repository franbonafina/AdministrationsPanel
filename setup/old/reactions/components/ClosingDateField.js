import { Field } from 'redux-form'
import React from 'react'
import Toggle from 'material-ui/Toggle'
import DatePicker from 'material-ui/DatePicker'

class NullClosingDate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      originalClosingDate: props.input.value,
      showCalendar: (props.input.value !== '')
    }
    this.style = {
      toggle: {
        marginBottom: 16,
        marginTop: 16
      }
    }
  }

  minClosingDate = () => {
    let date = new Date()
    date.setDate(date.getDate() + 1)
    return date
  }

  createDate = () => {
    let date = null
    if (this.state.originalClosingDate !== '') {
      date = new Date(this.state.originalClosingDate)
    } else {
      date = this.minClosingDate()
    }
    return date
  }

  handleChange = (event, active) => {
    console.log(event)
    console.log(active)
    if (active === true) {
      // closingDate will be defined, show calendar and set the calendar to the original date
      this.setState({ showCalendar: true })
      this.props.input.onChange(this.state.originalClosingDate)
    } else {
      // closingDate is set to null, hide calendar and updateValue.
      this.setState({ showCalendar: false })
      this.props.input.onChange(null)
    }
  }

  handleChangeDate = (event, date) => {
    // date has changed!
    this.props.input.onChange(date)
  }

  render () {
    return (
      <div>
        {this.state.showCalendar
          ? <DatePicker floatingLabelText='Add a closing date?' defaultDate={this.createDate()} minDate={this.minClosingDate()} onChange={this.handleChangeDate} />
          : null
        }
        <Toggle
          label='Yes, add a closing date'
          labelPosition='right'
          toggled={this.state.showCalendar}
          onToggle={this.handleChange}
          style={this.style.toggle} />
      </div>
    )
  }
}

const ClosingDateField = () => (
  <span>
    <Field name='closingDate' component={NullClosingDate} label='Closing Date' />
  </span>
)

export default ClosingDateField
