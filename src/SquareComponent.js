import './App.css';

function SqaureComponent(props) {
    const classes = props.className ? `${props.className} square` : `square`;
    return (
        <span className={classes} onClick={props.onClickSquare}>
            {props.squareState}
        </span>
    );
}

export default SqaureComponent;
