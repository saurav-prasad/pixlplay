import { v4 as uuidv4 } from 'uuid';
const keyGenerator = () => {
    let myuuid = uuidv4();
    return myuuid
}
export default keyGenerator