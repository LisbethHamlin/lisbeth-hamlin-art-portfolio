fs = require "lfs"

NUMBER_PATTERN = "%d+"
TEASER_IMAGE_PATTERN = ".+-teaser"

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
    return string.match(fileName, TEASER_IMAGE_PATTERN) == nil
end

function commandQueueSorter(a, b)
    local numA = string.match(a, NUMBER_PATTERN)
    local numB = string.match(b, NUMBER_PATTERN)
    
    if numA and numB then
        a = tonumber(numA)
        b = tonumber(numB)
    end

    return a > b
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
                local strippedFileName = removeExtension(file)
                table.insert(sortedCommandQueue, strippedFileName)
            end
        end
    end

    table.sort(sortedCommandQueue, commandQueueSorter)

    for i, v in ipairs(sortedCommandQueue) do
        local cmd = "octopress new post \"" .. v .. "\" --dir " .. (userSpecifiedPath or path) .. " --template sub-media"
        print(cmd)
        os.execute(cmd)
        os.execute("sleep 1") -- TODO: figure out how to get rid of this. Maybe we could use touch
    end
end

args = {...}
if args[1] then
    scandir(args[1], args[2])
else
    print("Please select a folder")
end
