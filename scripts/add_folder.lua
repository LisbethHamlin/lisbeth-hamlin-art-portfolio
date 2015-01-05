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

function scandir(root, path)
    path = path or ""
    for file in fs.dir( root .. path ) do
        if file ~= "." and file ~= ".." and file ~= "scripts" then
            local f = path .. '/' .. file
            local attr = lfs.attributes( root .. f )

            if attr.mode == "directory" then
                scandir( root, f )
            else
                local strippedFileName = removeExtension(file)
                local cmd = "octopress new post \"" .. strippedFileName .. "\" --dir " .. "portfolio" .. path .. " --template sub-media"
                print(cmd)
                os.execute(cmd)
            end
        end
    end
end

args = {...}
if args[1] then
    scandir(args[1])
else
    print("Please select a folder")
end