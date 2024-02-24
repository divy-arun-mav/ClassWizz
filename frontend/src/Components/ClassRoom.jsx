import React from 'react'

export default function ClassRoom() {
    return (
        <div className="container mt-5">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Class Strength" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button class="btn btn-success" type="button" id="button-addon2">Button</button>
            </div>
            <ul class="list-group mt-5">
                <li class="list-group-item">An item
                <span className='ms-auto'>
                <button class="btn btn-success">Allocate</button>
                </span>
                </li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
                <li class="list-group-item">A fourth item</li>
                <li class="list-group-item">And a fifth one</li>
            </ul>
            <style>{`
            .input-group input{
                border:2px solid black;
                color: black;
                font-weight:bolder;
            }
            `}</style>
        </div>
    )
}
