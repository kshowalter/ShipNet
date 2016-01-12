//module.exports = {
export default {
  //test: false,
  count: 1,
  UI: {

  },
  universe: {
    time: {
      day: 0,
      tick: 0,
      minute: 0,
      hour: 0
    },
    ships_in_system: [
      {
        name: 'KIT Explorer',
        class: 'Explorer',
        components: {
          generator: {
            type: 'power',
            status: 'off',
            power_output: 10000
          },
          engine: {
            type: 'engine',
            status: 'off',
            power_max: 10000
          }
        }
      }
    ]
  }

};
