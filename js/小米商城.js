// 第二个导航展示
const nav2Conts = document.querySelectorAll('#nav2-cont ul');
const nav2 = document.querySelectorAll('#nav2-title>ul>li');
const nav2Cont = document.querySelectorAll('#nav2-cont')
for (let i = 0; i < nav2.length - 2; i++) {
    nav2[i].addEventListener('mouseover', () => {
        nav2Conts[i].style.display = 'block';
    });
    nav2Conts[i].addEventListener('mouseover', () => {
        nav2Conts[i].style.display = 'block';
    });
    nav2[i].addEventListener('mouseout', () => {
        nav2Conts[i].style.display = 'none';
    });
    nav2Conts[i].addEventListener('mouseout', () => {
        nav2Conts[i].style.display = 'none';
    });
}


// 搜索框
const nav2Search = document.querySelector('#search-text');
const searchBox = document.querySelector('#search-box');
nav2Search.addEventListener('click', () => {
    searchBox.style.display = 'block';
})
nav2Search.addEventListener('blur', () => {
    searchBox.style.display = 'none';
})

// 侧边栏商品
const secLis = document.querySelectorAll('#main-cont>section>ul>li');
const secLisBox = document.querySelectorAll('#main-cont>article>ul');
const articleBox = document.querySelector('#main-cont>article');
for (let i = 0; i < secLis.length; i++) {
    secLis[i].addEventListener('mouseover', () => {
        secLisBox[i].style.display = 'flex';
        articleBox.style.display ='inline-block';
    })
    secLis[i].addEventListener('mouseout', () => {
        secLisBox[i].style.display = 'none';
        articleBox.style.display = 'none';
    })
    secLisBox[i].addEventListener('mouseover', () => {
        secLisBox[i].style.display = 'flex';
        articleBox.style.display ='inline-block';
    })
    secLisBox[i].addEventListener('mouseout', () => {
        secLisBox[i].style.display = 'none';
        articleBox.style.display = 'none';
    })
}

// 轮播图
const lunboImgs = document.querySelectorAll('#main-cont>img');
const pre = document.querySelector('#prev-btn');
const aft = document.querySelector('#aft-btn');
const lunboBtns = document.querySelectorAll('#lunbo-btn>ul>li');
let now = 0;
let timer = setInterval(next, 3000);
pre.addEventListener('click', function () {
    prev();
});
aft.addEventListener('click', function () {
    next();
});

pre.addEventListener('mouseover', function () {
    clearInterval(timer);
})
pre.addEventListener('mouseout', function () {
    timer = setInterval(next, 3000);
})
aft.addEventListener('mouseover', function () {
    clearInterval(timer);
})
aft.addEventListener('mouseout', function () {
    timer = setInterval(next, 3000);
})
for (let i = 0; i < lunboBtns.length; i++) {
    lunboBtns[i].addEventListener('click', function () {
        for (let i = 0; i < lunboBtns.length; i++) {
            lunboImgs[i].removeAttribute('style');
            lunboBtns[i].removeAttribute('class');
        }
        lunboImgs[i].style.display = 'block';
        lunboBtns[i].className = 'lied';
        now = i;
    })
    lunboBtns[i].addEventListener('mouseover', function () {
        clearInterval(timer);
    })
    lunboBtns[i].addEventListener('mouseout', function () {
        timer = setInterval(next, 3000);
    })
}


function next() {
    lunboImgs[now].removeAttribute('style');
    lunboBtns[now].removeAttribute('class');
    if (now == lunboImgs.length - 1) {
        now = 0;
    } else {
        now++;
    }
    lunboImgs[now].style.display = 'block';
    lunboBtns[now].className = 'lied';
}

function prev() {
    lunboImgs[now].removeAttribute('style');
    lunboBtns[now].removeAttribute('class');
    if (now == 0) {
        now = lunboImgs.length - 1;
    } else {
        now--;
    }
    lunboImgs[now].style.display = 'block';
    lunboBtns[now].className = 'lied';
}

// 获取购物数据
const goodsCont = document.querySelector('#goods-cont');
fetch('http://180.76.185.37:3000/shopData', {
    method: 'POST',
}).then((response) => {
    return response.json();
}).then((response) => {
    let a = response;
    for (let i = 0; i < a.length; i++) {
        let img = a[i].imageUrl;
        let title = a[i].name;
        let text = a[i].brand;
        let price = a[i].cost;
        let id = a[i].id;
        let div = document.createElement('div');
        goodsCont.appendChild(div);
        let inner = '';
        inner += `
            <img src="${img}">
            <span class="title">${title}</span>
            <span class="text">${text}</span>
            <span class="price">${price}元</span>
            <span class="id" style="display:none">${id}</span>
            <div class="icon-buy" style="display:none">加入购物车</div>`;
        div.innerHTML = inner;
    }
    return a;
}).then((a) => {
    // 加入购物车
    const divs = document.querySelectorAll('#goods-cont>div');
    const iconBuy = document.querySelectorAll('.icon-buy');
    let token = localStorage.getItem('token2');

    for (let i = 0; i < divs.length; i++) {
        let img = a[i].imageUrl;
        let title = a[i].name;
        let text = a[i].brand;
        let price = a[i].cost;
        let id = a[i].id;
        let color = a[i].color;
        let sales = a[i].sales;
        iconBuy[i].addEventListener('click', function () {
            if (token) {
                fetch('http://180.76.185.37:3000/addCartData', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        token: token,
                        data: {
                            id: id,
                            name: title,
                            brand: text,
                            imageUrl: img,
                            sales: sales,
                            cost: price,
                            color: color,
                        }

                    }),
                }).then((response) => {
                    return response.json();
                }).then((response) => {
                    // console.log(response);
                    let y = shopcarNums.innerHTML;
                    shopcarNums.innerHTML = parseInt(y) + 1;
                    alert('添加成功')
                    get();
                })
            } else {
                alert('请先登录')
            }

        })
    }
    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener('mouseover', function () {
            iconBuy[i].removeAttribute('style')
        })
        divs[i].addEventListener('mouseout', function () {
            iconBuy[i].style.display = 'none'
        })
    }

})

// 登录,注册页面的变化
const dl2 = document.querySelector('#dl2');
const dl = document.querySelector('#dl');
const zc2 = document.querySelector('#zc2');
const zc = document.querySelector('#zc');
const mainBody = document.querySelector('#main-body');
const mainBody2 = document.querySelectorAll('#top-nav>ul>li');
const shopcar = document.querySelector('#shopcar');
const goods = document.querySelector('#goods')
const admin = document.querySelector('#admin');
const cars1 = document.querySelector('.cars1');
const cars2 = document.querySelector('.cars2');
shopcar.addEventListener('mouseover', function () {
    cars1.removeAttribute('style')
    cars2.removeAttribute('style')
})
shopcar.addEventListener('mouseout', function () {
    cars1.style.display = "none";
    cars2.style.display = "none"
})
cars2.addEventListener('mouseover', function () {
    cars1.removeAttribute('style')
    cars2.removeAttribute('style')
})
cars2.addEventListener('mouseout', function () {
    cars1.style.display = "none";
    cars2.style.display = "none"
})
shopcar.addEventListener('click', (event) => {
    goods.removeAttribute('style');
    dl.style.display = "none";
    zc.style.display = "none";
    mainBody.style.display = "none";
    admin.style.display = "none";
})

dl2.addEventListener('click', () => {
    mainBody.setAttribute('style', "display:none");
    dl.removeAttribute('style');
    zc.style.display = "none";
    goods.style.display = "none";
    admin.style.display = "none";
})
zc2.addEventListener('click', () => {
    mainBody.setAttribute('style', "display:none");
    zc.removeAttribute('style');
    dl.style.display = "none";
    goods.style.display = "none";
    admin.style.display = "none";
})
for (let i = 0; i < mainBody2.length; i++) {
    mainBody2[i].addEventListener('click', () => {
        mainBody.removeAttribute('style');
        dl.style.display = "none";
        zc.style.display = "none";
        goods.style.display = "none";
    })
}
// 账号登录
const btnDl = document.querySelector('#btn-dl');
const btnZc = document.querySelector('#btn-zc');
const dlText1 = document.querySelector('#dl-text1');
const dlText2 = document.querySelector('#dl-text2');
const zcText1 = document.querySelector('#zc-text1');
const zcText2 = document.querySelector('#zc-text2');
const zcText3 = document.querySelector('#zc-text3');
const dlCheck = document.querySelector('#dl-check');
let auth = 'user';
dlCheck.addEventListener('mousedown', () => {
    if (auth == 'user') {
        auth = 'admin';
    } else {
        auth = 'user'
    }
})

// 登录
btnDl.addEventListener('click', function () {
    let username1 = dlText1.value;
    let password1 = dlText2.value;
    fetch('http://180.76.185.37:3000/login', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            username: username1,
            password: password1,
            auth: auth,
        }),
    }).then((response) => {
        return response.json();
    }).then((response) => {
        console.log(response);
        let a = response.token;
        let name = response.name;
        let auth = response.auth
        localStorage.setItem('token2', a);
        localStorage.setItem('name', name);
        localStorage.setItem('auth', auth);
        window.location.reload();
    })

})

// 注册
btnZc.addEventListener('click', function () {
    let username = zcText1.value;
    let password = zcText2.value;
    let name = zcText3.value;
    // console.log(username);
    // console.log(password);
    // console.log(name);
    fetch('http://180.76.185.37:3000/register', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password,
            name: name,
        }),
    }).then((response) => {
        return response.json();
    }).then((response) => {
        // console.log(response);
        alert('注册成功了，快去登录试试看吧！')
    })
})

// 获取用户购物数据
const tbodyGoods = document.querySelector('#goods>div>table>tbody')
const shopcarNums = document.querySelector('#shopcar-num')
const myName = document.querySelector('#myName');
const out = document.querySelector('#out');
function get() {
    let token = localStorage.getItem('token2');
    fetch('http://180.76.185.37:3000/getCartData', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            token: token,
        }),
    }).then((response) => {
        return response.json();
    }).then((response) => {
        let a = response.result;
        tbodyGoods.innerHTML = '';
        cars2.innerHTML = '';
        shopcarNums.innerHTML = a.length;
        let b = a.length > 3 ? 3 : a.length;
        for (let i = 0; i < b; i++) {
            let img = a[i].imageUrl;
            let name = a[i].name;
            let div = document.createElement('div');
            cars2.appendChild(div);
            let inner2 = `
            <img src="${img}">
            <span>${name}</span>
            `;
            div.innerHTML = inner2;
        }
        for (let i = 0; i < a.length; i++) {
            let img = a[i].imageUrl;
            let name = a[i].name;
            let cost = a[i].cost;
            let id = a[i].id;
            let x = 1;
            let color = a[i].color;
            let colors = ifcolor(color);
            let tr = document.createElement('tr');
            tbodyGoods.appendChild(tr);
            let inner = `
        <td class="name">
            <div>
                <img src="${img}">
                <div>${name}</div>
            </div>
        </td>
        <td class="color">
            <div>
                <div>${color}</div>
                <div class="y" style="background-color: ${colors}"></div>
            </div>
        </td>
        <td id="cost">${cost}元</td>
        <td id="costs">${cost}元</td>
        <td class="number">
            <div>
                <button id="jian">-</button>
                <div id="num">${x}件</div>
                <button id="jia">+</button>
            </div>
        </td>
        <td class="delete">
            <button id="nobuy">删除</button>
            <button id="buy">购买</button>
        </td>
        <td id="ids" style="display:none">${id}</td>
        `
            tr.innerHTML = inner;
        }
        let num = document.querySelectorAll('#num');
        let jia = document.querySelectorAll('#jia');
        let jian = document.querySelectorAll('#jian');
        let costs = document.querySelectorAll('#costs');
        let cos = document.querySelectorAll('#cost');
        let buy = document.querySelectorAll('#buy');
        let nobuy = document.querySelectorAll('#nobuy');
        let trs = document.querySelectorAll('#goods>div>table>tbody>tr')
        let ids = document.querySelectorAll('#ids');
        for (let i = 0; i < jia.length; i++) {
            jia[i].addEventListener('click', function () {
                let cost = parseInt(cos[i].innerHTML);
                let x = parseInt(num[i].innerHTML);
                x++;
                num[i].innerHTML = x + '件'
                costs[i].innerHTML = cost * x + '元'
            })
            jian[i].addEventListener('click', function () {
                let cost = parseInt(cos[i].innerHTML);
                let x = parseInt(num[i].innerHTML);
                if (x > 0) {
                    x--;
                }
                num[i].innerHTML = x + '件'
                costs[i].innerHTML = cost * x + '元'
            })
            nobuy[i].addEventListener('click', function () {
                let x = confirm("你确定要删除吗？");
                let ids2 = ids[i].innerHTML;
                if (x == true) {
                    tbodyGoods.removeChild(trs[i]);
                    fetch('http://180.76.185.37:3000/deleteCartData', {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({
                            token: token,
                            id: ids2,
                        }),
                    }).then((response) => {
                        return response.json();
                    }).then((response) => {
                        console.log(response);
                    })
                    alert('删除成功')
                    shopcarNums.innerHTML =shopcarNums.innerHTML - 1;
                }
            })
            buy[i].addEventListener('click', function () {
                let x = confirm("你确定要购买吗？")
                let ids2 = ids[i].innerHTML;
                console.log(ids2);
                if (x == true) {
                    tbodyGoods.removeChild(trs[i]);
                    fetch('http://180.76.185.37:3000/deleteCartData', {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({
                            token: token,
                            id: ids2,
                        }),
                    }).then((response) => {
                        return response.json();
                    }).then((response) => {
                        console.log(response);
                    })
                    alert('购买成功');
                    shopcarNums.innerHTML =shopcarNums.innerHTML - 1;
                }
            })
        }

    })
}

const token = localStorage.getItem('token2');
const authNow = localStorage.getItem('auth');
const adminConts = document.querySelector('.admin-cont');
if (token) {
    if (authNow == "admin") {
        admin.removeAttribute('style');
        out.removeAttribute('style');
        mainBody.style.display = 'none';
        fetch('http://180.76.185.37:3000/getUserData', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                token: token,
            }),
        }).then((response) => {
            return response.json();
        }).then((response) => {
            // console.log(response);
            let a = response.result;
            for (let i = 0; i < a.length; i++) {
                let name = a[i].name;
                let username = a[i].username;
                let password = a[i].password;
                let div = document.createElement('div');
                adminConts.appendChild(div);
                let inner = ''
                inner += `
                <div style="width:58%;text-align:left;">${name}</div>
                <div style="width:10%" id="admin-cont-usernames">${username}</div>
                <div style="width:10%">${password}</div>
                <div  style="width:10%">
                    <button class="admin-cont-btn">修改</button>
                </div>
                <div style="width:10%">
                    <button class="admin-cont-btn" id="admin-cont-delete">删除</button>
                </div>
                `
                div.innerHTML = inner;
            }
        }).then((response) => {
            let deletes = document.querySelectorAll('#admin-cont-delete');
            let usernames = document.querySelectorAll('#admin-cont-usernames');
            for (let i = 0; i < deletes.length; i++) {
                deletes[i].addEventListener('click', function () {
                    console.log(usernames[i].innerText);
                    let x = confirm("你确定要删除吗？");
                    console.log(x == true);
                    if (x == true) {
                        fetch('http://180.76.185.37:3000/deleteUser', {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify({
                                username: usernames[i].innerText,
                            }),
                        }).then((response) => {
                            return response.json();
                        }).then((response) => {
                            console.log(response);
                            alert('删除成功');
                            window.location.reload();
                        })
                    }
                })
            }
        })
    } else {
        get();
        let name = localStorage.getItem("name")
        dl2.style.display = 'none';
        zc2.style.display = 'none';
        myName.removeAttribute('style');
        out.removeAttribute('style');
        myName.innerText = "用户名" + name;
    }
}

function ifcolor(name) {
    if (name == '金色') {
        return 'gold';
    } else if (name == '蓝色') {
        return 'skyblue';
    } else if (name == '红色') {
        return 'red';
    } else {
        return 'white';
    }
}

out.addEventListener('click', function () {
    localStorage.clear();
    alert('你已经退出登录');
    window.location.reload();
})


// 添加购物数据
const addGoodsadmin = document.querySelector('#admin-add-goods');
const Newgood = document.querySelector('#add-goods-admin');
addGoodsadmin.addEventListener('click', () => {
    if (Newgood.style.display == 'none') {
        Newgood.removeAttribute('style')
    } else {
        Newgood.style.display = 'none'
    }

})
const btn1 = document.querySelector('#btn1')
const btn2 = document.querySelector('#btn2')
btn1.addEventListener('click', () => {
    Newgood.style.display = 'none'
})
btn2.addEventListener('click', () => {
    let input1 = document.querySelector('#input1').value;
    let input2 = document.querySelector('#input2').value;
    let input3 = document.querySelector('#input3').value;
    let input4 = document.querySelector('#input4').value;
    let input5 = document.querySelector('#input5').value;
    let input6 = document.querySelector('#input6').value;
    console.log(input1, input2);
    fetch('http://180.76.185.37:3000/addShopData', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            shopDatas: {
                name: input1,
                brand: input2,
                imageUrl: input3,
                sales: input4,
                cost: input5,
                color: input6
            }
        }),
    }).then((response) => {
        return response.json();
    }).then((response) => {
        alert('添加成功')
    })
})

const talks1 = document.querySelectorAll('.home-right>.home-move>#talks');
const animiations1 = document.querySelectorAll('.home-right>.home-move');
for (let i = 0; i <talks1.length; i++){
    animiations1[i].addEventListener('mouseover',function () {
        talks1[i].style.transform='translateY(-100px)';
    });
    animiations1[i].addEventListener('mouseout',function () {
        talks1[i].removeAttribute('style');
    });
}

