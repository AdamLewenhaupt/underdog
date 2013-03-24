mongoose = require("mongoose")
Schema = mongoose.Schema

chatlogSchema = new Schema
  # Chat names
  names: [String]

  # Chat messages
  messages: [String]

chatlogSchema.methods.appendMessage = (msg) ->
  @names.push msg.sender
  @messages.push msg.message

ChatLog = mongoose.model("ChatLog", chatlogSchema)

pub = (clog) ->
  names: clog.names
  messages: clog.messages

exports.get = (id, fn) ->
  if id
    ChatLog.findById id, (err, chatLog) ->
      if err
        fn error: err
      else
        fn pub(chatLog)
  else
    fn error: "No id specified"

exports.post = (data, fn) ->
  if data
    posting = new ChatLog(data)
    posting.save (err) ->
      if err
        fn error: err
      else
        fn pub(posting)
  else
    fn error: "no data"

exports.put = (id, data, fn) ->
  if data
    ChatLog.findById id, (err, clog) ->
      unless err
        data.forEach (msg) ->
          data.methods.appendMessage msg
        clog.save (err) ->
          unless err
            fn(clog)
          else
            fn error: "Unable to save"
      else
        fn error: "Unable to find"
  else
    fn error: "no data"

exports.model = ChatLog