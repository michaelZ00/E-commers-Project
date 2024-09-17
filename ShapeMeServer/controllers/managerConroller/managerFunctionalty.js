


module.exports = {
  filter: (arrayObjs) => {
        const filterdObjects = arrayObjs.map((user) => ({
          id: user._id,
          name: user.name,
          lastName: user.last_name,
          email: user.email,
        }));
        return filterdObjects
      },
    }

