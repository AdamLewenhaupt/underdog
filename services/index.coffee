#
#The services package provides a interface to all services,
#such as algorithms, chatting, broadcasting etc.
#
exports.services =
  io: require("./io")
  auth: require("./auth")