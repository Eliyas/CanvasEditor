/**
 * Created by Mohamed Eliyas on 27-01-2018.
 */

class SidePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };
    }

    /**
     * calls on file select, saves file in app state.
     * @param e
     */
    fileChangeHandler = (e) => {
        let fileObj = e.target.files[0];
        if (fileObj) {
            this.props.sidePanelHandler.setFileHandler(fileObj)
        }
    }

    /**
     * calls upload function in app state
     */
    fileUploadHandler = () => {
        this.props.sidePanelHandler.fileUploadHandler()
    }

    /**
     * to get text from text input, and set in state
     * @param e event
     */
    textChangeHandler = (e) => {
       let text = e.target.value;
        if(!text) return;
        this.setState({text: text})
    }


    textAddHandler = () => {
        if(!this.state.text) return;
        this.props.sidePanelHandler.textAddHandler(this.state.text);
        this.setState({text: ""});
    }

    render() {
        let imageList = this.props.imageList;
        let ImageListComponent = imageList.map((imageSrc, index) => (
            <span onClick={() => {
            this.props.sidePanelHandler.imageClickHandler(imageSrc)}}>
                 <Images src={imageSrc} key={index}/>
            </span>
        ))

        return (
            <div className="sidepane col-sm-2 col-md-2 col-lg-2">
                <div className="form">
                    <h3>Form</h3>
                    <input type="file" className="form-control" placeholder="Upload Your Images" name="upload"
                           onChange={this.fileChangeHandler}/>
                    <button id="submit" className="btn btn-default" onClick={this.fileUploadHandler}>
                        upload
                    </button>

                </div>

                <hr />

                <div className="assets">
                    <h3>Assets</h3>
                    <div className="text">
                        <h4>Text</h4>
                        <input type="text" className="text-input" value={this.state.text} onChange={this.textChangeHandler}/>
                        <button id="addText" className="btn btn-default" onClick={this.textAddHandler}>Add Text</button>
                    </div>
                    <button id="addText" onClick={this.props.sidePanelHandler.saveDraggables}
                            className="btn btn-default">Save All
                    </button>
                    <div className="image text-center">
                        <h4 className="pull-left">Images</h4>
                        {ImageListComponent}
                    </div>
                </div>
            </div>
        );
    }
}

