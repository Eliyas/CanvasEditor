/**
 * Created by Mohamed Eliyas on 27-01-2018.
 */

const BASE_URL = "http://localhost:8000";
const IMAGE_FETCH_URL = BASE_URL + "/images";
const IMAGE_UPLOAD_URL = BASE_URL + "/uploads";
const DELETE_IMAGE_URL = BASE_URL + "/delete/image";

const DELETE_TEXT_URL = BASE_URL + "/delete/text";

const SAVE_DRAGGABLE_URL = BASE_URL + "/save/draggable";
const GET_DRAGGABLE_URL = BASE_URL + "/list/draggable";


function fetchImages() {
    return fetch(IMAGE_FETCH_URL)
        .then((res) => {
            return res.json();
        })
        .then((result) => {
            return result
        })
}

function uploadImage(fileObj) {
    const formData = new FormData();
    formData.append('upload',fileObj)
    return fetch(IMAGE_UPLOAD_URL,
        {
            method: 'POST',
            body: formData
        })
        .then((res) => {
            return res.json();
        })
        .then((result) => {
            return result
        })
}

function saveDraggableList(draggableList) {
    return fetch(SAVE_DRAGGABLE_URL,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({draggableList})
        })
        .then((res) => {
            return res.json();
        })
        .then((result) => {
            return result
        })
}


function fetchDraggableList() {
    return fetch(GET_DRAGGABLE_URL)
        .then((res) => {
            return res.json();
        })
        .then((result) => {
            return result
        })
}

function deleteImageAndDraggable(id) {
    return fetch(DELETE_IMAGE_URL +'/'+id)
        .then((res) => {
            return res.json();
        })
        .then((result) => {
            return result
        })
}

function deleteTextDraggable(id) {
    return fetch(DELETE_TEXT_URL +'/'+id)
        .then((res) => {
            return res.json();
        })
        .then((result) => {
            return result
        })
}
