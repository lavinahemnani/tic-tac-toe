import './App.css';

/**
 * This functional component is used for rendering the individual square component
 * @param {*} props 
 */
function SqaureComponent(props) {
    const classes = props.className ? `${props.className} square` : `square`;
    return (
        <span className={classes} onClick={props.onClickSquare}>
            {props.squareState}
        </span>
    );
}

/** Export the component */
export default SqaureComponent;
