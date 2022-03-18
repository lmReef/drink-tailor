import Tag from '../../common/tag/tag';

const Tags = ({ tags }) => {
  tags.sort();

  return (
    <div className="tags">
      {tags.map((tag, index) => {
        return <Tag key={index} name={tag} />;
      })}
    </div>
  );
};

export default Tags;
