define("appkit/adapters/application", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // export default DS.FixtureAdapter.extend();
    __exports__["default"] = DS.LSAdapter.extend({ namespace: 'todo-emberjs' });
  });