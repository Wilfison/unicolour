window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

if (!window.indexedDB) {
  alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
}

/* ------------------------------- Get Paletes ---------------------------  */
document.addEventListener("DOMContentLoaded", getPalettes, false)

function getPalettes(){
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
    
    db = e.target.result
    tx = db.transaction(["PalettesStore"], "readwrite")
    store = db.transaction("PalettesStore").objectStore("PalettesStore")

    store.openCursor().onsuccess = (event) => {
      // console.log("Paletas: " + JSON.stringify(event.target.result));
      let paletteElement = document.getElementById('#palettesGrid')
      let palettes = event.target.result
      if(palettes){
        let paleteName = palettes.value.paleteName
        let paletteColors = palettes.value.PaletteColors

        let mapColors = paletteColors.map((color)=>{
          return '<div class="palette__componnet__color" style="background-color: ' + color + ';">' + color + '</div>'
        })
        //console.log(JSON.stringify(mapColors));
        
        
        let divPaletteElement = document.createElement("div")
        divPaletteElement.innerHTML = '<div class="palette__componnet"><h3>' + paleteName + '</h3><div class="palette__componnet__colors">' + mapColors + '</div>'
        
        paletteElement.appendChild(divPaletteElement)

        palettes.continue()
      }
    }

    tx.oncomplete = () => {
      db.close();      
    }
    
  }
}





/* ---------------------------- Delete Database ----------------------------------- */
function resetDb(){
  window.indexedDB.deleteDatabase("UnicolorDatabase")
}