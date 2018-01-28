/**
 * Created by Mohamed Eliyas on 27-01-2018.
 */

class CanvasComponent extends React.Component {
    render() {
        return (
            <div className="canvas col-sm-8 col-md-8 col-lg-8">
                { this.props.draggableObjectList.map((draggable, index) => (
                    <DraggableComponent draggableObj={draggable} key={index}
                                        canvasHandlers={this.props.canvasHandlers}/>
                ))
                }
            </div>
        );
    }
}

