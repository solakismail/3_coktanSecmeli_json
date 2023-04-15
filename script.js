//Sunucu baglantisi hazirlandi. https://www.w3schools.com/xml/xml_http.asp
let sunucudanGelen;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       //document.getElementById("demo").innerHTML = xhttp.responseText;
       sunucudanGelen=JSON.parse(xhttp.responseText);
        soruGetir();
        //console.log(sunucudanGelen);
    }
    return sunucudanGelen;
};
xhttp.open("GET", "data.json", true);
xhttp.send();

//indexHtml'deki soru, secenek, label ve buton elementlerine ulasildi, sabitlere aktarildi.
const goruntulemeAlani=document.getElementById("sinav");
const cevapSecenekleri=document.querySelectorAll(".secenek");
const mevcutSoru=document.getElementById("soru");

const aAciklama=document.getElementById("aAciklama");
const bAciklama=document.getElementById("bAciklama");
const cAciklama=document.getElementById("cAciklama");
const dAciklama=document.getElementById("dAciklama");

const gonderButonu=document.getElementById("sinavGonder");

//Sınavı başlatmadan puanı ve soru sayacını sıfırladık.
let puan=0;
let sira=0;

//Soruları getirmek için önce varsa seçimleri temizleyip sıradaki soruya ait soru ve cevap seçeneklerini doldurduk.
function soruGetir(){
    secimleriSifirla();

    //console.log(sunucudanGelen);
    let siradakiSoruIcerigi=sunucudanGelen.sorular[sira];

    mevcutSoru.innerHTML=siradakiSoruIcerigi.soru;
    aAciklama.innerText=siradakiSoruIcerigi.secenekA;
    bAciklama.innerText=siradakiSoruIcerigi.secenekB;
    cAciklama.innerText=siradakiSoruIcerigi.secenekC;
    dAciklama.innerText=siradakiSoruIcerigi.secenekD;
    console.log(mevcutSoru);
    console.log(aAciklama);
}

function secimleriSifirla(){
    cevapSecenekleri.forEach(secenek => secenek.checked=false);
}

//Kullanıcıdan seçimini işaretlediği şıkkın id bilgisi üzerinden alıp döndürdük.
function secimiAl() {
    let secim;
    
    cevapSecenekleri.forEach(secenek => {
        if(secenek.checked) {
            secim = secenek.id;
            
        }
    })

    return secim;
    console.log(secim);
}

//Butona tıklandığında cevabın doğruluğunu kontrol edip puan ve soru sırasını güncelleyerek sonraki soruya devam ettik.
gonderButonu.addEventListener('click', () =>{
    const secim = secimiAl();
  
        if(secim){
          if(secim === sunucudanGelen.sorular[sira].dogruCevap) {
            puan++;
          }
  
          sira++;
  
          //Son soruya kadar tekrar bir sonraki soruyu getirmeye devam ettik ve en sonunda sonucu yazdırdık.
          if(sira < sunucudanGelen.sorular.length) {
              soruGetir();
          } else {
              
              goruntulemeAlani.innerHTML = `
                  <h2>Mevcut sorulardan ${puan}/${sunucudanGelen.sorular.length} oranında başarı sağladınız.</h2>
  
                  <button onclick="location.reload()">Yeniden Başla</button>
              `
              
          }
        }
  })