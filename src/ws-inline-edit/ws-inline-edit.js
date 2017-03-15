import { React, Component } from '../imports';
require('./ws-inline-edit.scss');

//  props: {
//    text: 'Something'
//  }

export class WSInlineEdit extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isEditing: false,
      text: props.text
    }
  }
  
  editElement() {
    this.setState({isEditing: true}, () => {
      this.editEl.focus();
    });
  };
  
  keyAction(e) {
    if(e.keyCode === 13) {
      // Enter to save
      this.setState({text: e.target.value, isEditing: false});
    } else if(e.keyCode === 27) {
      // ESC to cancel
      this.setState({isEditing: false});
    }
  };
  
  blurAction(e) {
    this.setState({text: e.target.value, isEditing: false});
    this.updating(e.target.value);
  };
  
  updating(text) {
    this.props.onUpdate(text);
  }
  
  render({}, { text, isEditing }) {
    if ( isEditing ) {
      return(
        <div class="ws-inline-edit-field">
          <input
            type = "text"
            onBlur = { (e) => this.blurAction(e) }
            onKeyDown = { (e) => this.keyAction(e) }
            defaultValue = { text }
            ref = { (el) => this.editEl = el } />
        </div>
      );
    } else {
      return(
        <div class="ws-inline-edit" onClick = { () => this.editElement() }>
          <div> { text } </div>
        </div>
      );
    }
  }
}
