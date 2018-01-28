/**
 * Created by Mohamed Eliyas on 27-01-2018.
 */
/*
*  component common for all type of draggable text and image
* */
class DraggableComponent extends React.Component {

    // initialize draggable, registers event handlers 
    componentDidMount() {
        let draggableObj = this.props.draggableObj;
        draggableObj.registerEventHandlers(draggableObj.element);
    }
    
    render() {
        let {deleteImageHandler, deleteTextHandler} = this.props.canvasHandlers;
        let {draggableObj} = this.props;
        let style = {
            left: draggableObj.position.left,
            top: draggableObj.position.top,
        }
        let draggableItem = draggableObj.isImage ?
            <img src={draggableObj.src} alt="image" className="draggable-img"/>
            : <span>{draggableObj.text}</span>;

        return (
            <span style={style} className="draggable-item-wrapper draggable"
                  ref={(element) => {draggableObj.setElement(element)}}>
                <span className="delete-btn" onClick={()=> { draggableObj.isImage ?
                deleteImageHandler(draggableObj.id) : deleteTextHandler(draggableObj.id) }}>X</span>
                { draggableItem }
            </span>
        );
    }
}
