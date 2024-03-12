function createEventEmitter() {
  //object of listeners
  const listenersMap = {}

  return {
    on(evName, listener) {
      // if there is an event so add listener to that arry
      // else creat new array with that listener
      listenersMap[evName] = listenersMap[evName]
        ? [...listenersMap[evName], listener]
        : [listener]

      return () => {
        // clear listner from event
        listenersMap[evName] = listenersMap[evName].filter(
          (func) => func !== listener
        )
      }
    },

    emmit(evName, data) {
      // is there is no event so return
      // if there is run over all of its listners and pass the data
      if (!listenersMap[evName]) return
      listenersMap[evName].forEach((listener) => listener(data))
    },
  }
}

export const eventBusService = createEventEmitter()
