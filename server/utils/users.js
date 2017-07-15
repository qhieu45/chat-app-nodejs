class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) { 
        const user = this.users.filter(user => user.id === id);
        this.users = this.users.filter(user => user.id !== id);
        return user[0];
    }

    getUser(id) {
        const user = this.users.filter(user => user.id === id);
        return user[0];        
    }

    getUserList(room) {
        const namesArray = this.users.filter(user => user.room === room)
                                    .map(user => user.name);
        // const users = this.users.filter((user) => {
        //     return user.room === room;
        // });
        // const namesArray = users.map((user) => {
        //     return user.name;
        // })
        return namesArray;
    }
}

module.exports = { Users };