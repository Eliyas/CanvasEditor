/**
 * Created by Mohamed Eliyas on 27-01-2018.
 */

/**
 * create draggable instance for every images and text, handles all info about draggable instance
 * position {left, top}, src (imageURL will "" for text), element (html element), text ("" for image)
 * @param imageUrl
 * @param isImage
 * @constructor
 */
function Draggable(imageUrl = "", isImage) {

    this.id = null;
    this.element = null;
    this.src = imageUrl;
    this.isImage = isImage;
    this.text = "";

    this.position = {
        left: 100,
        top: 100
    }
}

Draggable.prototype.setId = setId;
Draggable.prototype.setText = setText;
Draggable.prototype.setElement = setElement;
Draggable.prototype.setPosition = setPosition;
Draggable.prototype.getElement = getElement;
Draggable.prototype.updatePosition = updatePosition;
Draggable.prototype.buildDbObj = buildDbObj;
Draggable.prototype.registerEventHandlers = registerEventHandlers;

function buildDbObj() {
    this.updatePosition();
    return {
        id: this.id,
        src: this.src,
        isImage: this.isImage,
        text: this.text,
        position: this.position,
    }
}

function setId(id) {
    if (!id) return;
    this.id = id;
}

function setElement(element) {
    if (!element) return;
    this.element = element;
}

function getElement() {
    return this.element;
}

function setPosition(position) {
    this.position = position;
}

function updatePosition() {
    this.position = {
        left: this.element.style.left,
        top: this.element.style.top
    }
}

function setText(text) {
    this.text = text;
}

/***
 * registers event handlers mouseMove, mouseUp and mouseDown in every draggable instance
 * images and text
 */
function registerEventHandlers() {
    const {fromEvent} = Rx.Observable;
    const _doc = $(document), _draggable = $(this.element), _parent = $('.canvas');

    // boundary so that the draggable content can't move outside of the its container
    const _parentOffset = _parent.offset(),
        _minLeft = 0,
        _minTop = 0,
        _parentWidth = _parent.width(),
        _parentHeight = _parent.height(),
        _maxLeft = _minLeft + _parentWidth - _draggable.width(),
        _maxTop = _minTop + _parentHeight - _draggable.height();

    // get the stream of events from the mousedown, mousemove and mouseup events
    const mouseUp = fromEvent(_parent, 'mouseup');
    const mouseMove = fromEvent(_parent, 'mousemove');
    const mouseDown = fromEvent(_draggable, 'mousedown');


    // for each mouse down event, get all the subsequent changes in the clientX and
    // clientY values resulting from the mouse move events until mouse up event occurs
    var mouseDrags = mouseDown.selectMany((md) => {
        return mouseMove
            .map((mm) => {
                mm.preventDefault();
                return getTargetNewPosition(mm, md)
            }).takeUntil(mouseUp);
    });

    mouseDrags.subscribe((targetPosition) => {
            let {left, top} = targetPosition;
            let newLeft = Math.min(Math.max(left, _minLeft), _maxLeft);
            let newTop = Math.min(Math.max(top, _minTop), _maxTop);
            _draggable.css({left: newLeft, top: newTop})
        }
    );

    function getTargetNewPosition(mm, md) {
        let left = mm.clientX - _parentOffset.left - _draggable.width() / 2;
        return {
            left: left + window.scrollX, top: mm.clientY + window.scrollY - _draggable.height() / 2,
            targetLeft: md.clientX, targetTop: md.clientY
        };
    }
}

