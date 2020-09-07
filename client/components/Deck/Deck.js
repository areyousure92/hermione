import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  Switch, 
  Route, 
  Link, 
  useParams, 
  useRouteMatch,
} from 'react-router-dom';
import CardList from './CardList/CardList';
import AddCard from './AddCard';
import EditDeck from './EditDeck';
import { 
  readDeckFetch, 
  showDeckLoading, 
  hideDeckLoading, 
} from '../../redux/actions/deckActions';
import { clearCardlist } from '../../redux/actions/cardActions';
import MainHeader from '../ui/MainHeader/MainHeader';
import MainBody from '../ui/MainBody/MainBody';
import DeckSettings from './DeckSettings';

const Deck = ({ 
  userId, readDeck, readedDeck, 
  showDeckLoading, hideDeckLoading, 
  deckIsLoading, clearCardlist,
}) => {
  const match = useRouteMatch();
  const { username, deckId } = useParams();

  useEffect(() => {
    const fetchReadDeck = async (userId) => {
      await readDeck(userId, deckId);
    }
    clearCardlist();
    showDeckLoading();
    fetchReadDeck(userId)
      .then(() => hideDeckLoading())
  }, [userId, deckId]);

  return (
    <>
      <MainHeader>
        { deckIsLoading
            ? <div className="title">Загрузка...</div>
            : <div className="title">{ readedDeck && readedDeck.deckname }</div>
        }
        <div className="nav">
          <Link to={`/${username}/decklist`}>На главную</Link>
          <Link to={`${match.url}`}>Колода</Link>
          <Link to={`${match.url}/cardlist`}>Список карт</Link>
          <Link to={`/${username}/learn/${deckId}`}>Учить</Link>
        </div>
      </MainHeader>

      <MainBody>
        <Switch>
          <Route 
            path={`${match.path}/cardlist`} 
            component={CardList}
          />
          <Route 
            path={`${match.path}/addcard`} 
            component={AddCard}
          />
          <Route 
            path={`${match.path}/editdeck`}
            component={EditDeck}
          />
          <Route 
            path={`${match.path}`}
            component={DeckSettings}
          />
        </Switch>   
      </MainBody>
    </>
  );
};

Deck.propTypes = {
  readDeck: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  readedDeck: PropTypes.object,
  showDeckLoading: PropTypes.func.isRequired,
  hideDeckLoading: PropTypes.func.isRequired,
  deckIsLoading: PropTypes.bool.isRequired,
  clearCardlist: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  readedDeck: state.deck.readedDeck,
  deckIsLoading: state.deck.deckIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  readDeck: (userId, deckId) => dispatch(readDeckFetch(userId, deckId)),
  showDeckLoading: () => dispatch(showDeckLoading()),
  hideDeckLoading: () => dispatch(hideDeckLoading()),
  clearCardlist: () => dispatch(clearCardlist()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck);

