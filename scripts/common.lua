NUMBER_PATTERN = "%d+"
TEASER_IMAGE_PATTERN = ".+-teaser"

function validFile(fileName)
    return string.match(fileName, TEASER_IMAGE_PATTERN) == nil
end

function dashToSpace(str)
    return string.gsub(str, '-', ' ')
end

function removeNewLine(str)
	return string.gsub(str, "\n", "")
end

function removeExtension(str)
    local dotPos = string.find(str, "%.")
    local name
    if dotPos then
        name = string.sub(str, 1, dotPos - 1)
    end
    return name, dotPos and string.sub(str, dotPos)
end

function commandQueueSorter(a, b)
    local numA = string.match(a, NUMBER_PATTERN)
    local numB = string.match(b, NUMBER_PATTERN)
    
    if numA and numB then
        a = tonumber(numA)
        b = tonumber(numB)
    end

    return a < b
end