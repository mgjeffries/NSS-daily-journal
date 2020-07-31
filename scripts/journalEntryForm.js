const contentTarget = document.querySelector(".current-entry")

const render = () => {
  contentTarget.innerHTML = `
  <form action="">
    <fieldset>
      <label for="journalDate">Date of entry</label>
      <input type="date" name="journalDate" id="journalDate">
    </fieldset>
  </form>
    <form action="">
      <fieldset>
        <label for="mood">Mood</label>
        <select name="mood">
          <option value="happy">happy</option>
          <option value="meh">meh</option>
          <option value="sad">sad</option>
        </select>
      </fieldset>
    </form>
    <form action="">
      <fieldset>
        <label for="conceptsCovered">Concepts Covered</label>
        <input type="text" name="conceptsCovered" id="conceptsCovered">
      </fieldset>
    </form>
    <form action="">
      <fieldset>
        <label for="journalEntry">Journal Entry</label>
        <textarea name="journalEntry" rows="4" cols="50"></textarea>
      </fieldset>
    </form>
    <button type="button" class="submit-entry">Submit Entry</button>
  </section>
    `
}
