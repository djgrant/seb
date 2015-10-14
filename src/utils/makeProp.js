function makeProp(key, value) {
  return {
    [key]: {
      writable: true,
      configurable: true,
      value: value
    }
  }
}

export default makeProp;
