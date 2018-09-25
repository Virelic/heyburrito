import log from 'bog';
import EventEmitter from 'events';
import UserScore from '../types/UserScore.interface';

class BurritoStore extends EventEmitter {

    database:any
    constructor() {
        super();
        this.database = null;
    }

    setDatabase(database) {
        this.database = database;
    }

    givenBurritos(user:string) {
        return this.database.findFrom(user);
    }

    givenBurritosToday(user:string) {
        return this.database.findFromToday(user);
    }

    giveBurrito(to:string, from:string) {
        log.info('Burrito given to %s from %s', to, from);

        return this.database.give(to, from).then(() => this.emit('GIVE', to));
    }

    takeAwayBurrito(to:string, from:string) {
        log.info('Burrito taken away from %s by %s', to, from);

        return this.database.takeAway(to, from).then(() => this.emit('TAKE_AWAY', to));
    }

    getUserScore(user:string = null): Promise<Array<UserScore>> {
        return this.database.getScore(user);
    }

    getGiven(user:string): Promise<Array<UserScore>> {
        return this.database.getGiven(user);
    }

    getGivers(user:string): Promise<Array<UserScore>> {
        return this.database.getGivers(user);
    }
}

// Export as singleton
export default new BurritoStore();
