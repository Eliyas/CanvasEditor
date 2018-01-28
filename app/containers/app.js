/**
 * Created by Mohamed Eliyas on 27-01-2018.
 */


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            draggableObjects: [],
            imageList: [{src: "sfd"}],
        };
    }

    // inits image list and draggable in canvas before component
    componentWillMount() {
        this.initDraggables()
        this.initSideImages()
    }

    // inits side nav image list
    initSideImages = () => {
        fetchImages()
            .then((data) => {
                this.setState({imageList: data})
            })
    }

    // inits graggables in canvas
    initDraggables = () => {
        fetchDraggableList()
            .then((data) => {
                this.buildDraggables(data.draggableList)
            })
    }

    /***
     * build draggable from draggableIfo, creates Draggable instance on initial and after update
     * @param draggableInfoList
     */
    buildDraggables = (draggableInfoList = []) => {
        let draggableList = [];
        draggableInfoList.map((draggableInfo) => {
            let draggable = new Draggable(draggableInfo.src, draggableInfo.isImage);
            draggable.setPosition(draggableInfo.position);
            draggable.setElement(draggableInfo.element);
            draggable.setText(draggableInfo.text);
            draggable.setId(draggableInfo.id);
            draggableList.push(draggable);
        })
        this.setState({draggableObjects: draggableList});
    }

    getNewDraggableObj = (imageUrl = "", isImage) => (
        new Draggable(imageUrl, isImage)
    )

    /**
     * build draggable info dbObj to save draggable info list
     * @param draggableObjects
     * @returns {Array}
     */
    buildDraggableDb = (draggableObjects) => {
        var draggableInfoDbObjList = [];
        draggableObjects.forEach((draggable) => {
            draggableInfoDbObjList.push(draggable.buildDbObj());
        });
        return draggableInfoDbObjList;
    };

    imageClickHandler = (imgUrl) => {
        if (imgUrl) {
            this.setState({
                draggableObjects: [...this.state.draggableObjects,
                    this.getNewDraggableObj(imgUrl, true)]
            });
        }
    }

    saveDraggables = () => {
        let draggableObjects = this.buildDraggableDb(this.state.draggableObjects)
        saveDraggableList(draggableObjects)
            .then((data)=> {
                window.alert('Images and text saved');
                this.initDraggables()
            })
            .catch((err) => {
                window.alert('Warrning !, Failed to save Images and text');
            })
    };

    deleteImageHandler = (id) => {
        if(!id) return window.alert("Please save !");
        deleteImageAndDraggable(id)
            .then((data) => {
                window.alert("Image deleted successfully")
                this.initDraggables();
                this.initSideImages()
            })
            .catch((err) => {
                window.alert("Failed to delete Image")
            })
    }

    deleteTextHandler = (id) => {
        if(!id) return window.alert("Please save !");
        deleteTextDraggable(id)
            .then((data) => {
                window.alert("Text deleted successfully")
                this.initDraggables()
            })
            .catch((err) => {
                window.alert("Failed to delete Text")
            })
    }

    fileUploadHandler = () => {
        uploadImage(this.state.selectedFile)
            .then((res) => {
                this.setState({imageList: [...this.state.imageList, res.src]});
                window.alert("Image Uploaded successfully")
            })
            .catch((err) => {
                window.alert("Failed to upload Image")
            })
    }

    setFileHandler = (file) => {
        if(!file) return;
        this.setState({selectedFile: file})
    }

    textAddHandler = (text) => {
      let textDraggable = this.getNewDraggableObj("", false);
        textDraggable.setText(text);
        this.setState({
            draggableObjects: [...this.state.draggableObjects, textDraggable]
        });
    }

    render() {
        let sidePanelHandler = {
            imageClickHandler: this.imageClickHandler,
            saveDraggables: this.saveDraggables,
            deleteImageHandler: this.deleteImageHandler,
            fileUploadHandler: this.fileUploadHandler,
            setFileHandler: this.setFileHandler,
            textAddHandler: this.textAddHandler,
        }
        
        let canvasHandlers = {
            deleteTextHandler: this.deleteTextHandler,
            deleteImageHandler: this.deleteImageHandler,
        }
        return (
            <div>
                <SidePanel sidePanelHandler={sidePanelHandler} imageList={this.state.imageList}/>
                <CanvasComponent draggableObjectList={this.state.draggableObjects}
                                 canvasHandlers={canvasHandlers}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

