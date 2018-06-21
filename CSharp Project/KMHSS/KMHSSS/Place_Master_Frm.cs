using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.SqlClient;

namespace KMHSSS
{
    public partial class Place_Master_Frm : Form
    {
        string query, strplcid;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Place_Master_Frm()
        {
            InitializeComponent();
        }

        private void Place_Master_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                Alert_Msg_Lbl.Visible = false;
                Auto_Num();
                Fill_Grid();
                Place_Txt.Focus();
                PM_Date_Dtp.Value = DateTime.Now;
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Auto_Num()
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("select PM_Id from Place_Master_Table", con);
                String PM_Id = "PMID";
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        PM_Id = dr[0].ToString();
                        PM_Id = PM_Id.Replace("PMID", "");
                        int no = Convert.ToInt32(PM_Id);
                        no++;
                        PM_Id = "PMID" + no.ToString();
                    }
                }
                else
                {
                    PM_Id = "PMID101";
                }
                PM_Id_Txt.Text = PM_Id;
                dr.Close();
                con.Close();
                Place_Txt.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fill_Grid()
        {
            try
            {
                query = "select * from Place_Master_Table order by PM_ID desc";          
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Place_Master_dataGridView1.DataSource = dt;
                Place_Master_dataGridView1.ForeColor = Color.Black;
                Place_Master_dataGridView1.Columns[0].HeaderText = "PM Id";
                Place_Master_dataGridView1.Columns[1].HeaderText = "PM Date";
                Place_Master_dataGridView1.Columns[2].HeaderText = "Place Name";
                Place_Master_dataGridView1.Columns[0].Width = 110;
                Place_Master_dataGridView1.Columns[1].Width = 120;
                Place_Master_dataGridView1.Columns[2].Width = 180;
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Clear_Controls()
        {
            try
            {
                PM_Id_Txt.Text = "";
                PM_Date_Dtp.Text = "";
                Place_Txt.Text = "";
                Auto_Num();
                Place_Txt.Focus();
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
                Save_Btn.Enabled = true;               
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        public void Add()
        {
            if (PM_Id_Txt.Text != "" && PM_Date_Dtp.Text != "" && Place_Txt.Text != "")
            {
                try
                {
                    query = "Select * From Place_Master_Table Where Place='" + Place_Txt.Text.ToString().Trim() + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        MessageBox.Show("Already Exist");
                    }
                    else
                    {
                        dr.Close();
                        query = "insert into Place_Master_Table values('" + PM_Id_Txt.Text.Trim() + "','" + PM_Date_Dtp.Text.Trim() + "','" + Place_Txt.Text.Trim() + "')";
                        cmd = new SqlCommand(query, con);
                        cmd.ExecuteNonQuery();
                        Alert_Msg_Lbl.Visible = true;
                        Alert_Msg_Lbl.Text = "Inserted Successfully";
                    }
                    con.Close();
                    cmd.Cancel();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        public void Updat()
        {
            if (PM_Id_Txt.Text != "" && PM_Date_Dtp.Text != "" && Place_Txt.Text != "")
            {
                try
                {
                    query = "update Place_Master_Table set Place='" + Place_Txt.Text.Trim() + "' where PM_Id='" + PM_Id_Txt.Text.Trim() + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    Alert_Msg_Lbl.Visible = true;
                    Alert_Msg_Lbl.Text = "Updated Successfully";
                    con.Close();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        public void Del()
        {
            if (PM_Id_Txt.Text != "" && PM_Date_Dtp.Text != "" && Place_Txt.Text != "")
            {
                try
                {
                    query = "delete Place_Master_Table where PM_Id='" + PM_Id_Txt.Text.Trim() + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    Alert_Msg_Lbl.Visible = true;
                    Alert_Msg_Lbl.Text = "Deleted Successfully";
                    con.Close();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Place_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                try
                {
                    if (Place_Txt.Text != "")
                    {
                        if (Delete_Btn.Enabled == true)
                        {
                            Updat();
                        }
                        else
                        {
                            Add();
                        }
                        Place_Txt.Focus();
                        Fill_Grid();
                    }
                    else
                    {
                        Alert_Msg_Lbl.Visible = true;
                        Alert_Msg_Lbl.Text = "Please Fill All the Fields";
                    }
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void Place_Master_dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            try
            {
                strplcid = Place_Master_dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                PM_Id_Txt.Text = Place_Master_dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                PM_Date_Dtp.Text = Place_Master_dataGridView1.Rows[e.RowIndex].Cells[1].Value.ToString();
                Place_Txt.Text = Place_Master_dataGridView1.Rows[e.RowIndex].Cells[2].Value.ToString();
                Update_Btn.Enabled = true;
                Delete_Btn.Enabled = true;
                Clear_Btn.Enabled = true;
                Place_Txt.Focus();  
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }                

        private void Save_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Add();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Update_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Updat();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Delete_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Do You Want to Delete", "Delete", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                try
                {
                    Del();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Check the Details!!!");
            }  
        }

        private void Clear_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Do You Want to Clear", "Clear", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                try
                {
                    Clear_Controls();
                    Alert_Msg_Lbl.Text = "";
                    Alert_Msg_Lbl.Visible = false;
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Check the Details!!!");
            }  
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                this.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
