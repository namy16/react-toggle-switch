import PropTypes from 'prop-types';
import classnames from 'classnames';
import isString from 'lodash/isString';
import React, { Component } from 'react';
import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';
import './index.css';


class ToggleSwitch extends Component {

    state= {
        enabled: this.enabledFromProps
    };

    isEnabled = () => this.state.enabled;

    enabledFromProps = () =>{
        let {enabled} = this.props;
        enabled = isFunction(enabled)? enabled(): enabled;
        return isBoolean(enabled) && enabled;
    };

    toggleSwitch = evt =>{
        evt.persist();
        evt.preventDefault();

        const { onClick, onStateChanged } = this.props;
        this.setState({enabled: !this.state.enabled}, ()=>{
            const state = this.state;
            const switchEvent = Object.assign(evt, { SWTICH_STATE: state });
            isFunction(onClick) && onClick(switchEvent);
            isFunction(onStateChanged) && onStateChanged(state)
        })
    };

    render(){
        const { enabled, theme, onClick, className, onStateChanged, ...restProps } = this.props;
        const switchTheme = (theme && isString(theme)) ? theme : 'default';

        const switchClasses = classnames(`switch switch--${switchTheme}`);
        const togglerClasses = classnames(`switch-toggle--${enabled? 'on': 'off'}`)

        return (
            <div className={switchClasses} onClick={this.toggleSwitch} {...restProps}>
                <div className={togglerClasses}/>
            </div>
        )
    }
}


ToggleSwitch.propTypes = {
    theme: PropTypes.string,
    enabled: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func
    ]),
    onStateChamged: PropTypes.func
};

export default ToggleSwitch;