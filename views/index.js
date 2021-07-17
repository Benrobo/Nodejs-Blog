window.addEventListener("load", (e)=>{
    getAllPost()
})

async function getAllPost(){
    let data = await fetch("/post/all");
    let res = await data.json();

    insertData(res)
}

function insertData(data){
    let boxescont = document.querySelector(".boxes");
    data.forEach((el) => {
        boxescont.innerHTML += `
            <div class="box">
                <div class="img" style="background: url('${el.media}'); background-size:cover; background-position:center;"></div>
                <div class="main-cont">
                    <h3>${el.title.slice(0, 20) +"...."}</h3>
                    <span>by: ${el.author}</span> <small><b>${moment(el.created_at).startOf('minutes').fromNow()}</b></small>
                    <div class="body mt-2">
                        ${el.body.slice(0, 100)}
                    </div>
                    </br>
                    <a class ="btn btn-primary" target="_blank" href="/post/${el.uuid}">Read More</a>
                </div>
            </div>
        `
    });
}