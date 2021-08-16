/**
 * 
 *
 */

//
// classes

class Team {
    constructor(id, userIds, folderIds) {
        this.id = id
        this.userIds = userIds
        this.folderIds = folderIds
    }
}

class Folder {
    constructor(id, userIds, folderIds, fileIds) {
        this.id = id
        this.userIds = userIds
        this.folderIds = folderIds
        this.fileIds = fileIds
    }
}

class File {
    constructor(id, userIds) {
        this.id = id
        this.userIds = userIds
    }
}


//
// functions

class Node {
    constructor(id, userIds, children) {
        this.id = id
        this.userIds = userIds
        this.children = children
    }
}

const fsoToTree = (fso, folders, files) => {
    
    var children = [];

    // folders
    for (const i in fso.folderIds) {
        const id = fso.folderIds[i];
        const folder = folders.find(f => f.id === id);
        if (folder)
            children.push(fsoToTree(folder, folders, files));
    }

    // files
    for (const i in fso.fileIds) {
        const id = fso.fileIds[i];
        const file = files.find(f => f.id === id);
        if (file)
            children.push(fsoToTree(file, folders, files));
    }
    
    return new Node(fso.id, fso.userIds, children);
};

const initialize = (teams, folders, files) => {
    return teams.map(team => fsoToTree(team, folders, files));
};

const dfs = (node, x) => {
    if (node.userIds.find(id => id === x))
        return [node.id];

    var ids = [];
    for( const i in node.children ) {
        const n = node.children[i];
        ids = ids.concat(dfs(n, x));
    }
    return ids;
};

const topmostPermissions = (state, x) => {

    var perms = [];
    for( const i in state ) {
        const n = state[i];
        perms = perms.concat(dfs(n, x));
    }
    return perms;
};

const wrap = (teams, folders, files, userId) => {
    const state = initialize(teams, folders, files);
    return topmostPermissions(state, userId);
};


//
// input

const teams = [
    ["team1", ["user1"], ["folder1", "folder2"]],
    ["team2", [], ["folder2", "folder3"]]
].map(args => {
    const [id, userIds, folderIds] = args;
    return new Team(id, userIds, folderIds);
});

const folders = [
    ["folder1", ["folder4"], ["file1"]],
    ["folder2", ["user1"], ["file2"]],
    ["folder3", ["user1"], ["file3"]],
    ["folder4", ["user1"], ["file4"]]
].map(args => {
    const [id, userIds, folderIds, fileIds] = args;
    return new Folder(id, userIds, folderIds, fileIds)
});

const files = [
    ["file1", ["user1"]],
    ["file2", []],
    ["file3", []],
    ["file4", []]
].map(args => {
    const [id, userIds, folderIds, fileIds] = args;
    return new Folder(id, userIds, folderIds, fileIds)
});

const inputExpectedPairs = [
    [[teams, folders, files, "user1"], ["team1", "folder2", "folder3"]]
];



//
// exports (test harness)

module.exports = {
    f: wrap,
    inputExpectedPairs,
    name: 'Tree - top most permissions'
};
