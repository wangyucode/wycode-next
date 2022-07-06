export default function reducer(state: any, action: any): object {
    switch (action.type) {
      case 'toggleMenu':
        return {openMenu: action.payload};
      default:
        return {};
    }
}