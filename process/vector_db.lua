local sqlite = require("lsqlite3")
local json = require("json")
DBClient = DBClient or sqlite.open_memory()

local initSQL = [[
select vec_version();
]]

Handlers.add("Init", "Init", function(msg)
    local execResult = DBClient:exec(initSQL)

    msg.reply({ Status = "200", Data = execResult })
end)
