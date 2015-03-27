fs = require "lfs"

if not fs then
    print("Could not find Lua Filesystem.")
    return
end

function removeExtension(f)
    local dotPos = string.find(f, "%.")
    if dotPos then
        f = string.sub(f, 1, dotPos - 1)
    end
    return string.gsub(f, '-', ' ')
end

function validFile(fileName)
    local pos = string.find(fileName, "-tease")
    if pos then
        return false
    end
    return true
end

function scandir(root, userSpecifiedPath, path)
    local sortedCommandQueue = {}

    path = path or ""
    for file in fs.dir( root .. path ) do
        if file ~= "." and file ~= ".." and file ~= "scripts" then
            local f = path .. '/' .. file
            local attr = lfs.attributes( root .. f )

            if attr.mode == "directory" then
                scandir( root, userSpecifiedPath, f )
                elseif validFile(file) then
                 local strippedFileName = removeExtension(file);
                 table.insert(sortedCommandQueue, strippedFileName);
             end
         end
     end

     table.sort(sortedCommandQueue)

     for i, v in ipairs(sortedCommandQueue) do
        local cmd = "octopress new post \"" .. v .. "\" --dir " .. (userSpecifiedPath or path) .. " --template sub-media"
        print(cmd)
        os.execute(cmd)
    end
end

args = {...}
if args[1] then
    scandir(args[1], args[2])
else
    print("Please select a folder")
end
