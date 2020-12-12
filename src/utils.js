// 🚨 This should NOT be copy/pasted for production code and is only here
// for experimentation purposes. The API for suspense (currently throwing a
// promise) is likely to change before suspense is officially released.

import {useState, useCallback} from 'react'

// This was strongly inspired by work done in the React Docs by Dan Abramov
const useAsyncError = () => {
  const [_, setError] = useState()
  return useCallback(
    e => {
      setError(() => {
        throw e
      })
    },
    [setError],
  )
}

// function usePromiseResource(promise, initialProps) {
//   const [resource, setResource] = React.useState(null)
//   const [props, setResourceProps] = React.useState(initialProps)
//   const throwAsyncError = useAsyncError()

//   React.useEffect(() => {
//     if (!props) {
//       setResource(null)
//       return
//     }

//     setResource(promise(props))
//   }, [props])

//   let status = 'pending'
//   let result = promise.then(
//     resolved => {
//       status = 'success'
//       result = resolved
//     },
//     rejected => {
//       status = 'error'
//       result = rejected
//     },
//   )
//   return {
//     read() {
//       if (status === 'pending') throw result
//       if (status === 'error') throwAsyncError(result)
//       if (status === 'success') return result
//       throw new Error('This should be impossible')
//     },
//   }
// }
function createResource(promise) {
  let status = 'pending'

  // The promise is being trigger then the code block in let result is ran
  let result = promise.then(
    resolved => {
      status = 'success'
      result = resolved
    },
    rejected => {
      status = 'error'
      result = rejected
    },
  )
  return {
    read() {
      if (status === 'pending') throw result
      if (status === 'error') throw result
      if (status === 'success') return result
      throw new Error('This should be impossible')
    },
  }
}

function preloadImage(src) {
  return new Promise(resolve => {
    const img = document.createElement('img')
    img.src = src
    img.onload = () => resolve(src)
  })
}

export {createResource, preloadImage}
