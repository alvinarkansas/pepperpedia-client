import React from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function RecipeCard({ recipe, wide }) {
  const history = useHistory();
  const limit = 70;
  const longerLimit = 200;

  const StyledMenu = withStyles({
    paper: {
      borderRadius: '.5rem',
      boxShadow: '0px 0px 22px 2px rgba(158,158,158,0.59)'
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!wide) {
    return (
      <div className="recipe-card" onClick={() => history.push(`/detail/${recipe.id}`)}>
        <div className="thumbnail-wrapper">
          <img src={recipe.thumbnail} alt="thumbnail" />
        </div>
        <div className="recipe-description">
          <h3 className="mb-1">{recipe.title}</h3>
          <div>
            {recipe.story.length > limit
              ?
              <p>{`${recipe.story.substr(0, limit)} [ . . . ]`}</p>
              :
              <p>{recipe.story}</p>
            }
          </div>
        </div>
      </div>
    )
  } else {
    return (
      // <div className="recipe-card wide" onClick={() => history.push(`/detail/${recipe.id}`)}>
      <div className="recipe-card wide">
        <div className="thumbnail-wrapper">
          <img src={recipe.thumbnail} alt="thumbnail" />
        </div>
        <div className="recipe-description" style={{ position: 'relative' }}>
          <h3 className="mb-1 head-font">{recipe.title}</h3>
          <div>
            {recipe.story.length > longerLimit
              ?
              <p>{`${recipe.story.substr(0, longerLimit)} [ . . . ]`}</p>
              :
              <p>{recipe.story}</p>
            }
          </div>
          <StyledMenu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Delete</MenuItem>
            <MenuItem onClick={handleClose}>Edit</MenuItem>
          </StyledMenu>
          <div style={{ position: 'absolute', top: '2px', right: '2px' }} onClick={handleClick}>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
      </div>
    )
  }

}
