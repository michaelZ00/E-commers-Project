const jwt = require("jsonwebtoken");

module.exports = {
  filter: (arrayObjs) => {
    const filterdObjects = arrayObjs.map((user, i) => (
        {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            role: user.role
        }));
        return filterdObjects
  },
};
