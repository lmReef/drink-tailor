import Tag from './tag';

const Tags = ({ tags, sort = true, icon = null }) => {
  if (sort) tags.sort();

  return (
    <div className="tags">
      {tags.map((tag, index) => {
        return <Tag key={index} name={tag} icon={icon} />;
      })}
    </div>
  );
};

export default Tags;
