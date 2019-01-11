const book = {
    state: {
        fileName: ''
    },
    mutations: {
        'SET_FILENAME': (state, fileName) => {
            state.fileName = fileName
        }
    },
    actions: {
        setFileName: ({
            commit
        }, fileName) => {
            return commit('SET_FILENAME', fileName)
            // 需要return才能返回一个promise对象
        }
    }
}

export default book