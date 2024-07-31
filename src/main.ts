const dragContainers =  [...document.querySelectorAll("[data-autumn-container]")]
const draggableElements = [...document.querySelectorAll("[data-autumn-drag]")]

let initalMousePos = {
  x:0,
  y:0
}
let currentlyDraggingElement:HTMLElement | null = null
let lastValidSlot  :HTMLElement | null = null
let initalSlot:HTMLElement|null

document.addEventListener("pointerdown", (e) => {
  const target =e.target
  if (draggableElements.includes(e.target as HTMLElement)) {
    const el = e.target as HTMLElement
    const rect = el.getBoundingClientRect()
    const parent = el.parentElement!
    const parentRect = el.getBoundingClientRect()

    
    initalMousePos.x = e.clientX - rect.left 
    initalMousePos.y = e.clientY + rect.top
    el.style.userSelect = "none"
    currentlyDraggingElement = el
    currentlyDraggingElement.style.width = `${parentRect.width}px`
    currentlyDraggingElement.style.height = `${parentRect.height}px`
    currentlyDraggingElement.style.position = "absolute"
    currentlyDraggingElement.style.pointerEvents = "none"
    
    lastValidSlot = parent
    initalSlot= parent
  }
})


document.addEventListener("pointermove", (e) => {
  if (currentlyDraggingElement !== null) {
    
    const currX = e.clientX - initalMousePos.x
    const currY = e.clientY - initalMousePos.y
    currentlyDraggingElement.style.left = `${currX}px`
    currentlyDraggingElement.style.top = `${currY}px`

    const target = e.target as HTMLElement
    const validContainerIndex = dragContainers.indexOf(target)
    if (validContainerIndex !== -1) {
      lastValidSlot = dragContainers[validContainerIndex] as HTMLElement 
    } else {
      const lastValidElementIndex = draggableElements.indexOf(target)
      if (lastValidElementIndex !== -1) {
        lastValidSlot = draggableElements[lastValidElementIndex] as HTMLElement 
      }


    }

  }
})

document.addEventListener("pointerup", (e) => {


  //return to back
  
  currentlyDraggingElement!.style.width = "100%"
  currentlyDraggingElement!.style.height = "100%"
  currentlyDraggingElement!.style.position = "static"
  currentlyDraggingElement!.style.left = ""
  currentlyDraggingElement!.style.top = ""
  currentlyDraggingElement!.style.pointerEvents = "all"

  console.log(lastValidSlot)
  if (lastValidSlot!.hasAttribute("data-autumn-container")) {

    lastValidSlot!.appendChild(currentlyDraggingElement!)
  } else {
    console.log("f")
    // is element to switxh
    const newTarget = lastValidSlot!.parentElement! as HTMLElement
    initalSlot!.appendChild(lastValidSlot!)
    newTarget!.appendChild(currentlyDraggingElement!)


  }
    currentlyDraggingElement = null
    lastValidSlot=null
    initalSlot = null
    initalMousePos = {
      x:0,
      y:0
    }
})


// function arrayOneAndTwoHaveMatchingElements(array1:unknown[], array2:unknown[]){
//   for (let i = 0; i<array1.length;i++) {
//     const el = array1[i]
//     for (let j = 0;j<array2.length;j++ ) {
//       if (el === array2[j]) {
//         return true
//       }
//     }
//   }
//   return false
// }