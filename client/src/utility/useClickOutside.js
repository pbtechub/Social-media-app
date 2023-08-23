import React, { useEffect } from 'react'

export const useClickInside = (target, action, reducer) => {
  
let actionHandler;
  useEffect(()=> {
    let handler =  (event) => {
        if (target.current.contains(event.target)) {
          actionHandler = reducer(!action)
          }
         }
    document.addEventListener('mousedown', handler);   
    return () => {
      document.removeEventListener('mousedown', handler);
    }
  
  }, [])

  return actionHandler

}


export const useClickOutside = (target, action, reducer, setState) => {
  
let actionHandler;
  useEffect(()=> {
    let handler =  (event) => {
        if (!target.current.contains(event.target)) {
          actionHandler = reducer(action)
          if(setState) setState('')
          }
         }
    document.addEventListener('mousedown', handler);   
    return () => {
      document.removeEventListener('mousedown', handler);
    }
  
  }, [])

  return actionHandler

}

