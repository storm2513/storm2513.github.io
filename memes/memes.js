var CONTACTS  = function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': true,
        'url': 'db.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
}();
console.log(CONTACTS);

var MAX_COUNT = CONTACTS.length;
var count = 0;
count = JSON.parse(localStorage.getItem('count'));
console.log(count);

var Meme = React.createClass({
    render: function() {
        var style = { backgroundColor: this.props.color };
        return (
            <div className="meme" style={style}>
                <img src={this.props.children[1]} width={"380px"}></img>
                <span className="delete-meme" onClick={this.props.onDelete}> × </span>
                {this.props.children[0]}
            </div>
        );
    }
});

var MemeEditor = React.createClass({
    getInitialState: function() {
        return {
            text: ''
        };
    },

    handleMemeAdd: function() {
        console.log(count);
        if(count  == MAX_COUNT - 4)
            alert("МЕМАСИКИ ЗАКОНЧИЛИСЬ!!!1!\nНо! Так как тут любят Star wars, держите гифки с любимыми персонажами :)");
        else if(count > MAX_COUNT - 1)
            alert("Конец :)");
        var newMeme = {
            text: CONTACTS[count]["name"],
            color: 'yellow',
            id: Date.now(),
            url: CONTACTS[count]["image"],
        };
        if(count <= MAX_COUNT)
        count += 1;
        this.props.onMemeAdd(newMeme);
    },

    render: function() {
        return (
            <div className="meme-editor">
                <button className="add-button" onClick={this.handleMemeAdd}>Получить мемасик</button>
            </div>
        );
    }
});

var MemesGrid = React.createClass({
    componentDidMount: function() {
        var grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
            itemSelector: '.meme',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    },

    componentDidUpdate: function(prevProps) {
        if (this.props.memes.length !== prevProps.memes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },

    render: function() {
        var onMemeDelete = this.props.onMemeDelete;

        return (
            <div className="memes-grid" ref="grid">
                {
                    this.props.memes.map(function(meme){
                        return (
                            <Meme
                                key={meme.id}
                                onDelete={onMemeDelete.bind(null, meme)}
                                color={meme.color}>
                                {meme.text}
                                {meme.url}
                            </Meme>
                        );
                    })
                }
            </div>
        );
    }
});

var MemesApp = React.createClass({
    getInitialState: function() {
        return {
            memes: []
        };
    },

    componentDidMount: function() {
        var localMemes = JSON.parse(localStorage.getItem('memes'));
        if (localMemes) {
            this.setState({ memes: localMemes });
        }
    },

    componentDidUpdate: function() {
        this._updateLocalStorage();
    },

    handleMemeDelete: function(meme) {
        var memeId = meme.id;
        var newMemes = this.state.memes.filter(function(meme) {
            return meme.id !== memeId;
        });
        this.setState({ memes: newMemes });
        if(count != 0)
            count -= 1;
    },

    handleMemeAdd: function(newMeme) {
        var newMemes = this.state.memes.slice();
        newMemes.unshift(newMeme);
        this.setState({ memes: newMemes });

    },

    render: function() {
        return (
            <div className="memes-app">
                <h2 className="app-header">МЕМАСИКИ</h2>
                <MemeEditor onMemeAdd={this.handleMemeAdd} />
                <MemesGrid memes={this.state.memes} onMemeDelete={this.handleMemeDelete} />
            </div>
        );
    },

    _updateLocalStorage: function() {
        var memes = JSON.stringify(this.state.memes);
        localStorage.setItem('memes', memes);
        localStorage.setItem('count', count);
        console.log(localStorage);

    }
});

ReactDOM.render(
    <MemesApp />,
    document.getElementById('mount-point')
);