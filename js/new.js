/* ------------------------------- New Palete ----------------------------  */
document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById('newPalette').addEventListener("click", newPalette);
}, false)

function newPalette(){
  let request = window.indexedDB.open("UnicolorDatabase", 3), db, tx, store

  request.onupgradeneeded = (e) => {
    let db = request.result,
        store = db.createObjectStore('PalettesStore', {
          autoIncrement: true
        })
  }

  request.onerror = (e) => {
    console.error("There was an error: " + e.target.errorCode)
  }
  
  request.onsuccess = (e) => {
    newPaletteName = document.getElementById('paletteName').value
    color1 = document.getElementById('color1').value
    color2 = document.getElementById('color2').value
    color3 = document.getElementById('color3').value
    color4 = document.getElementById('color4').value
    color5 = document.getElementById('color5').value
    color6 = document.getElementById('color6').value
  
    db = e.target.result
    tx = db.transaction(["PalettesStore"], "readwrite")
    store = tx.objectStore("PalettesStore")
    
    db.onerror = (e) => {
      console.error("ERROR: " + e.target.errorCode)
    }
    
    store.put({
      paleteName: newPaletteName,
      PaletteColors: [
        color1,
        color2,
        color3,
        color4,
        color5,
        color6
      ]
    })
  
    tx.oncomplete = () => {
      db.close();
      console.log("Paleta salva com sucesso!");
      window.location = "./popup.html"
    }
  
  }

}