const expect = require('expect');
const { Users } = require('./users');


describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [
            {id: '1', name:'Mike', room:'Node'},
            {id: '2', name:'Hieu', room:'React'},
            {id: '3', name:'Huy', room:'Node'}            
        ]
    })
    it('should add new user', () => {
        let users = new Users();
        const user = {
            id: '123',
            name: 'Hieu',
            room: 'ABC'
        }
        const resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]); 
    });

    it('should remove a user', () => {
        const user = users.removeUser('3');
        expect(users.users.length).toBe(2);
        expect(user).toEqual({id: '3', name:'Huy', room:'Node'});
    });

    it('should not remove user', () => {
        const user = users.removeUser('44');
        expect(users.users.length).toBe(3);
        expect(user).toNotExist();        
    });

    it('should find user', () => {
        const user = users.getUser('2');
        expect(user).toEqual({id: '2', name:'Hieu', room:'React'});
    });

    it('should not find user', () => {
        const user = users.getUser('22');
        expect(user).toNotExist();
    });

    it('should return names for Node', () => {
        const userList = users.getUserList('Node');
        expect(userList).toEqual(['Mike', 'Huy']);
    })

    it('should return name for React', () => {
        const userList = users.getUserList('React');
        expect(userList).toEqual(['Hieu']);
    })


})