const ARRAY_GIA_UBER_X = [8000,12000,10000];
const GIA_CHO_UBER_X = 2000;

const ARRAY_GIA_SUV = [9000,14000,12000];
const GIA_CHO_SUV = 3000;

const ARRAY_GIA_BLACK = [10000,16000,14000];
const GIA_CHO_BLACK = 4000;

function kiemTraLoaiXe(){
    var uberX = document.getElementById("uberX");
    var uberSUV =document.getElementById ("uberSUV");
    var uberBlack =document.getElementById("uberBlack");
    if(uberX.checked){
        return "uberX";
    }else if(uberSUV.checked){
        return "uberSUV";
    }else if(uberBlack.checked){
        return "uberBlack" ;
    }
}

function tinhTienCho(thoiGianCho,giaCho){
    var tienCho = 0;
    if(thoiGianCho >= 3){
        tienCho = Math.round(thoiGianCho/3.0)*giaCho;
    }
    return tienCho;
}

function tinhTien(soKM,thoiGianCho,arrayPrice,giaCho){
    var tienCho = tinhTienCho(thoiGianCho,giaCho);
    if(soKM <= 1){
        return arrayPrice[0] + tienCho;
    }else if(soKM > 1 && soKM <=20){
        return arrayPrice[0] + (soKM - 1)*arrayPrice[1] + tienCho;
    }else if (soKM > 20){
        return arrayPrice[0] + 19*arrayPrice[1] + (soKM - 20)*arrayPrice[2] + tienCho;
    }
}

function tinhTongTien(){
    var soKM =document.getElementById("soKM").value;
    var thoiGianCho =document.getElementById("thoiGianCho").value;
    soKM =parseFloat(soKM);
    thoiGianCho = parseFloat(thoiGianCho);
    var tongTien = 0;
    var loaiXe = kiemTraLoaiXe();
    switch(loaiXe){
        case "uberX":
        tongTien = tinhTien(soKM,thoiGianCho,ARRAY_GIA_UBER_X,GIA_CHO_UBER_X);
        break;
        case "uberSUV":
        tongTien = tinhTien(soKM,thoiGianCho,ARRAY_GIA_SUV,GIA_CHO_SUV);
        break;
        case "uberBlack":
        tongTien = tinhTien(soKM,thoiGianCho,ARRAY_GIA_BLACK,GIA_CHO_BLACK);
        break;
        default:alert ("hãy chọn loại xe");
    }
    return  tongTien;
}



     
document.getElementById("btnTinhTien").onclick = function(){
    var tongTien = tinhTongTien();
    document.getElementById("divThanhTien").style.display = "block";
    document.getElementById("xuatTien").innerHTML = (tongTien);
}



function renderRowChiTietKm(loaixe,arrayKm,arrayPrice,tblBody){
    for(var i = 0; i<arrayKm.length; i++)
    var tr =document.createElement("tr");

    var tdLoaiXe =document.createElement("td");
    var tdSuDung = document.createElement("td");
    var tdDonGia = document.createElement("td");
    var tdThanhTien = document.createElement("td");

    tdLoaiXe.innerHTML = loaixe;
    tdSuDung.innerHTML = arrayKm[i] + "km";
    tdDonGia.innerHTML = arrayPrice[i];
    tdThanhTien.innerHTML =  arrayKm[i] * arrayPrice[i] ;

    tr.appendChild(tdLoaiXe);
    tr.appendChild(tdSuDung);
    tr.appendChild(tdDonGia);
    tr.appendChild(tdThanhTien);

    tblBody.appendChild(tr);
}

function renderRowThoiGianCho(thoiGianCho,giaCho,tblBody){
    var tienCho = tinhTienCho(thoiGianCho,giaCho);
    var trThoiGianCho = document.createElement("tr");

    var tdPhutTitle = document.createElement("td");
    var tdPhut = document.createElement("td");
    var tdDongGia = document.createElement("td");
    var tdThanhTien = document.createElement("td");

    tdPhutTitle.innerHTML= ("phút chờ");
    tdPhut.innerHTML = thoiGianCho + ("phút");
    tdDongGia.innerHTML = giaCho;
    tdThanhTien.innerHTML = tienCho;

    trThoiGianCho.appendChild(tdPhutTitle);
    trThoiGianCho.appendChild(tdPhut);
    trThoiGianCho.appendChild(tdDongGia);
    trThoiGianCho.appendChild(tdThanhTien);

    tblBody.appendChild(trThoiGianCho);
    
}

function renderRowTongCong(tongTien,tblBody){
    var trTotal = document.createElement("tr");
    trTotal.className = "alert alert-success";
    trTotal.setAttribute("colpan",4);
    var tdTotalTile = document.createElement("td");
    
    var tdTotal = document.createElement("td");

    tdTotalTile.innerHTML = "Tổng tiền phải trả";
    tdTotal.innerHTML = tongTien;

    trTotal.appendChild(tdTotalTile);
    trTotal.appendChild(tdTotal);

    tblBody.appendChild(trTotal);
}

function inHoaDon(loaiXe,soKM,thoiGianCho,giaCho,arrayPrice,tongTien){
    var tblBody = document.getElementById("tblBody");
    tblBody.innerHTML = "";
    if(soKM <=1){
        renderRowChiTietKm(loaiXe,[1], arrayPrice, tblBody);
    } if(soKM > 1 && soKM <= 20){
        renderRowChiTietKm(loaiXe, [1, soKM - 1], arrayPrice,tblBody );
    }
     if(soKM > 20){
        renderRowChiTietKm(loaiXe, [1,19, soKM - 20], arrayPrice,tblBody);
    }
    if(thoiGianCho > 2){
        renderRowThoiGianCho(thoiGianCho, giaCho, tblBody);
    }
    renderRowTongCong(tongTien,tblBody);
}

document.getElementById("btnInHD").onclick = function(){
    var kq = getData();
    var tongTien = tinhTongTien();
    var loaixe = kiemTraLoaiXe();
    switch(loaixe){
    case "uberX":
    inHoaDon(loaixe,kq[0],kq[1],GIA_CHO_UBER_X,ARRAY_GIA_UBER_X,tongTien);
    break;
    case "uberSUV":
    inHoaDon(loaixe,kq[0],kq[1],GIA_CHO_SUV,ARRAY_GIA_SUV,tongTien);
    break;
    case "uberBlack":
    inHoaDon(loaixe,kq[0],kq[1],GIA_CHO_BLACK,ARRAY_GIA_BLACK,tongTien);
    break;
    default: alert("vui lòng chọn loại xe");
    }
    
}

function getData(){
    var kq = [];
    var soKM = document.getElementById("soKM").value;
    soKM = parseFloat(soKM);
    kq.push(soKM);
    var thoiGianCho = document.getElementById("thoiGianCho").value;
    thoiGianCho = parseFloat(thoiGianCho);
    kq.push(thoiGianCho);
    return kq;
}