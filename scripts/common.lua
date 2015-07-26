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